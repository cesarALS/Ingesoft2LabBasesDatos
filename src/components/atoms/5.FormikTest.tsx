import { useFormik } from "formik";

export default function BasicForm() {
    
    const formik = useFormik({
        initialValues: {
            email: "",
            age: "",
            password: ""
        },
    });


    console.log(formik);
    return (
        <form autoComplete="off">
            <label htmlFor="email">Email</label>
            <input 
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email" 
                type="email" 
                placeholder="Enter your Email"
            />

            <label htmlFor="age">Age</label>
            <input 
                value={formik.values.age}
                onChange={formik.handleChange}
                id="age" 
                type="number" 
                placeholder="Enter your Age"
            />            

            <label htmlFor="email">Password</label>
            <input 
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password" 
                type="password" 
                placeholder="Enter your Password"
            />            
        </form>
    )
}