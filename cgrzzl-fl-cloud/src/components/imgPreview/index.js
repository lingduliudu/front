import ImgPreviewComponent from './imgPreview'

const ImgPreview = {}

ImgPreview.install = Vue => {
    const ImgConstructor = Vue.extend(ImgPreviewComponent)

    const instance = new ImgConstructor()

    instance.$mount(document.createElement('div'))

    document.body.appendChild(instance.$el)

    Vue.prototype.$imgPreview = (e) => {
        instance.target = e.currentTarget
            //instance.imgs = instance.target.getAttribute('data-img').split(',')
        instance.imgs = instance.target.getAttribute('data-img')
        instance.isShowImageDialog = true
    }
}

export default ImgPreview