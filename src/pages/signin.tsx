import { useForm } from 'react-hook-form';

const SigninPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register('email', { required: true })} />
        {errors.email && <p>This field is required</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <p>This field is required</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default SigninPage;