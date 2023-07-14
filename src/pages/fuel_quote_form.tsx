import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';


const Fuel_quote = () => {
    const {register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = async (data) => {
      // data includes all the form values
      console.log(data);

      const response = await fetch('api/fuelquote', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // this is the form data
      });

      if (response.ok) {
          // Handle success
          const responseData = await response.json();
          console.log(responseData);
      } else {
          const errorData = await response.json();
          // Handle error, maybe display the errorData to user
          console.log(errorData);
      }
  }

    return (
        <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label>Gallons Requested:</label>
              <input {...register('GallonNeeded', { required: true })} />
              {errors.GallonNeeded && <p>This field is required</p>}
            </div>

            <div>
                <label>Delivery Address:</label>
                <input type="text" {...register('deliveryAddress')}/>
            </div>

            <div>
                <label>Delivery Date:</label>
                <input type="date" {...register('deliveryDate', {required: true})} />
                {errors.deliveryDate && <p>This field is required</p>}
            </div>

            <div>
              <label>Suggested Price / Gallon:</label>
              <input type="number" {...register('ppg')} readOnly />
            </div>

            <div>
                <label>Total Amount Due:</label>
                <input type="number" {...register('totalAmountDue')} readOnly />
            </div>

            <div className="flex justify-end">
              <button className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
};

export default Fuel_quote;

/*NOTE: the front end contains basic client side validations. More secure validations are
used in the backend */

//TODO: incorporate proper credential corrections. Right now it's all in console. 