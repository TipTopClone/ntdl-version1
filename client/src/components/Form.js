import React, { useState } from 'react';
import { postData } from '../helper/axiosHelper';

const hoursWk = 24 * 7;

const initialState = {
  task: '',
  hr: '',
};
export const Form = ({ getTasks, totalHrs, setResp, resp }) => {
  const [form, setForm] = useState(initialState);
  const [resp, setResp] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    resp?.message && setResp({});

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (totalHrs + +form.hr > hoursWk) {
      return alert('Sorry boss not enough time left to fit this task');
    }

    // send data to the database
    const data = await postData(form);
    setResp(data);

    if (data.status === 'success') {
      //reset the form
      setForm(initialState);

      //call api to fetch all the task
      getTasks();
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      class='mt-5 border p-5 rounded shadow-lg bg-transparent'
    >
      <div class='row g-2'>
        <div class='col-md-6'>
          <input
            type='text'
            class='form-control'
            placeholder='Coding..'
            aria-label='First name'
            name='task'
            value={form.task}
            required
            onChange={handleOnChange}
          />
        </div>
        <div class='col-md-3'>
          <input
            type='number'
            min='1'
            class='form-control'
            placeholder='23'
            aria-label='Last name'
            name='hr'
            value={form.hr}
            required
            onChange={handleOnChange}
          />
        </div>
        <div class='col-md-3'>
          <div class='d-grid'>
            <button class='btn btn-primary'>Add Task</button>
          </div>
        </div>
      </div>
    </form>
  );
};
