var albumBucketName = 'poc.test.bucket';
var bucketRegion = 'eu-west-2';
var IdentityPoolId = 'eu-west-2:185a73aa-d63d-4d3b-8f60-6769362ab8dc';

AWS.config.update({
	region: bucketRegion,
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: IdentityPoolId
	})
});

var s3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: {Bucket: albumBucketName}
});

function addFile() {
	var files = document.getElementById('photoupload').files;
	if (!files.length) {
		return alert('Please choose a file to upload first.');
	}
	var file = files[0];
	var fileName = file.name;

	var photoKey = fileName;
	s3.upload({
		Key: photoKey,
		Body: file,
		ACL: 'public-read'
	}, function(err, data) {
		if (err) {
			return alert('There was an error uploading your file: ', err.message);
		}
		alert('Successfully uploaded file.');
		viewAlbum();
	});
}

function deleteFile(photoKey) {
	s3.deleteObject({Key: photoKey}, function(err, data) {
		if (err) {
			return alert('There was an error deleting your file: ', err.message);
		}
		alert('Successfully deleted photo.');
		viewAlbum();
	});
}

function viewAlbum() {
	var albumPhotosKey = encodeURIComponent('') + '//';
	s3.listObjects({Delimiter: '/'}, function(err, data) {
		if (err) {
			return alert('There was an error viewing your files: ' + err.message);
		}
		// 'this' references the AWS.Response instance that represents the response
		var href = this.request.httpRequest.endpoint.href;
		var bucketUrl = href + albumBucketName + '/';

		var photos = data.Contents.map(function(photo) {
			var photoKey = photo.Key;
			var photoUrl = bucketUrl + encodeURIComponent(photoKey);
			return getHtml([
				'<span>',
				'<div>',
				'<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
				'</div>',
				'<div>',
				'<span onclick="deleteFile(\'' + photoKey + '\')">',
				'X',
				'</span>',
				'<span>',
				photoKey.replace(albumPhotosKey, ''),
				'</span>',
				'</div>',
				'</span>',
			]);
		});
		var message = photos.length ?
			'<p>Click on the X to delete the file</p>' :
			'<p>You do not have any files. Please add files.</p>';
		var htmlTemplate = [
			'<h2>',
			'Files: ',
			'</h2>',
			message,
			'<div>',
			getHtml(photos),
			'</div>',
			'<input id="photoupload" type="file">',
			'<button id="addphoto" onclick="addFile()">',
			'Add File',
			'</button>',
		]
		document.getElementById('app').innerHTML = getHtml(htmlTemplate);
	});
}
