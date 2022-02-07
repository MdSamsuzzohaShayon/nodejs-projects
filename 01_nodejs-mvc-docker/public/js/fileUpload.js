// FilePond.registerPlugin(
//     // https://pqina.nl/filepond/docs/patterns/plugins/introduction/
//     FilePondPluginImagePreview,
//     // FilePondPluginImagePreview,
//     // FilePondPluginImagePreview,
// )
// FilePond.parse(document.body);


document.addEventListener('DOMContentLoaded', function() {
    FilePond.registerPlugin(
        // https://pqina.nl/filepond/docs/patterns/plugins/introduction/
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )
    FilePond.setOptions({
        stylePanelAspectRatio: 150/100 ,
        imageResizeTargetWidth: 100,
        imageResizeTargetHeight: 150,

    })
    FilePond.parse(document.body);
  }); 