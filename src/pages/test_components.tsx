import StringForm from "@/components/atoms/4.StringForm"
import BasicForm from "@/components/atoms/5.FormikTest"

export default function TestComponents(){
    return (
        /*
        <>
            <h1>Hola</h1>
            <form>
                <StringForm
                placeholderValue = "80"
                minLength={4}
                maxLength={7}
                isRequired={true}
                isNumeric={true}
                />
                <StringForm
                placeholderValue = "Hey"
                minLength={4}
                maxLength={7}
                isRequired={false}
                isNumeric={false}
                />                
                <button className="bg-color-yellow-300">
                    Submit
                </button>
                <h2>Hola</h2>
            </form>

        </>
        */
        <>
            <BasicForm/>
        </>
    )
}