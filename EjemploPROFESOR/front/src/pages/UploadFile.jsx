const UploadFile = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target.file.files[0]
        const nombre = e.target.nombre.value
        const formData = new FormData()

        formData.append("file", file)
        formData.append("nombre", nombre)
        fetch("http://localhost:2025/api/upload", {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return (
        <form onSubmit={handleSubmit} enctype="multipart/form-data" >
            <input type="file" name="file" />
            <input type="text" name="nombre" />
            <button type="submit" >Guardar</button>
        </form>
    )
}

export default UploadFile