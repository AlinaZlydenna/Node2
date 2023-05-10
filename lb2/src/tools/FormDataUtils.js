class FormDataUtils{
    static toObject(formData){
        const fd = new FormData(formData)

        return  Array.from(fd.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    }
}

export default FormDataUtils