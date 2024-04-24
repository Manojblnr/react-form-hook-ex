// import React, { useState } from "react";
// import './style.css'


// let renderCount = 0;

// const App = () => {

//   renderCount++

//   const [fName, setFName] = useState('')
//   const [lName, setLName] = useState('')

//   return (
//     <>
//       <div className="form">
//         <h3>render count {renderCount} </h3>

//         <div className="title"> Register form</div>
//         <div className="input">
//           <form>
//             <input type="text" placeholder="first name" 
//             value={fName} onChange={event => setFName(event.target.value)}
//             />
//             <input type="text" placeholder="last name" 
//             value={lName} onChange={event => setLName(event.target.value)}
//             />
//             <input type="submit" id="submit" />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// };

// export default App;



// import React, { useState } from "react";
// import './style.css'
// import { useForm } from "react-hook-form";



// let renderCount = 0;

// const App = () => {

//   renderCount++

//   const { register, handleSubmit, watch, formState:{errors} } = useForm({
//     // defaultValues: {
//     //   fName:'Manoj',  
//     //   lName:'kumar'
//     // }
//   });

//   console.log('errors', errors)
//   const fNameWatch= watch('fName')

//   return (
//     <>
//       <div className="form">
//         <h3>render count {renderCount} </h3>

//         <div className="title"> Register form</div>
//         <div className="input">
//           <form onSubmit={handleSubmit((data) => {
//             console.log('data', data)
//           })}>
//             <input type="text" placeholder="first name" 
//             {...register('fName', {required: 'first name is required', minLength: {
//               value:4,
//               message:'minimum 4 character required'
//             }})}
//             />
//             {errors?.fName && <p>{errors.fName.message}</p>}
//             <input type="text" placeholder="last name" 
//             {...register('lName', {required: 'last name is required', minLength: {
//               value:4,
//               message:'minimum 4 character required'
//             }})}
//             />
//             {errors?.lName && <p>{errors.lName.message}</p>}
//             <input type="submit" id="submit" />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// };

// export default App;




// Schema validation

// yup for creating object schema
// hookform/resolvers for converting the schema to react form hook


import React, { useState } from "react";
import './style.css'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


let renderCount = 0;

const schema = yup.object().shape({
  firstName: yup.string().required('first name is mandatory'),
  lastName : yup.string().required(),
  email : yup.string().email('Not a valid Email').required(),
  age : yup.number('age must be number').integer().positive().required(),
  password : yup.string().required().min(4, 'minimum 4 character required').max(12, 'maximum character is exceed'),
  confirmPassword : yup.string().oneOf([yup.ref("password"), null]),
})

const App = () => {

  renderCount++

  const { register, handleSubmit, formState: { errors, isValid, isDirty }} = useForm({
    resolver: yupResolver(schema),
    mode:'onChange'
  });


  console.log('errors', errors);
  console.log('valid', isValid)

  return (
    <>
      <div className="form">
        <h3>render count {renderCount} </h3>

        <div className="title"> Register form</div>
        <div className="input">
          <form onSubmit={handleSubmit((data) => {
            console.log('data', data)
          })}>
            <input {...register('firstName')} type="text" placeholder="first name"/>
            <p>{errors?.firstName?.message}</p>
            <input {...register('lastName')} type="text" placeholder="last name"/>
            <p>{errors?.lastName?.message}</p>
            <input {...register('email')} type="text" placeholder="Email" />
            <p>{errors.email?.message}</p>
            <input {...register('age')} type="text" placeholder="Age" />
            <p>{errors?.age?.message}</p>
            <input {...register('password')} type="text" placeholder="password" />
            <p>{errors.password?.message}</p>
            <input {...register('confirmPassword')} type="text" placeholder="confirm password" />
            <p>{errors.confirmPassword?.message}</p>
            <input type="submit" id="submit" disabled={isDirty && !isValid} />
          </form>
        </div>
      </div>
    </>
  )
};

export default App;