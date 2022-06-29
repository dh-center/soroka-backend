import React from 'react'

const ImportAction = () => {
    async function submitForm(form) {
        const formData = new FormData(form)

        const response = await fetch(
            '/v1/admin/import-csv',
            {
                method: 'POST',
                body: formData
            }
        )

        if (response.status === 200) {
            form.reset()

            alert('Импорт завершён')
        }
    }

    return (
        <form
            style={{display: "flex", flexDirection: "column"}}
            onSubmit={(event) => {
                event.preventDefault()
                submitForm(event.target)
            }}
        >
            <label style={{fontSize: "1.5rem"}} htmlFor="csvFile">
                Choose CSV:
            </label>
            <input style={{marginTop: "1.5rem"}} name="csvFile" type="file" id="csvFile" />
            <button
                style={{marginTop: "1.5rem", maxWidth: "25%"}} 
                type="submit"
            >
                Отправить
            </button>
        </form>
    )
}

export default ImportAction
