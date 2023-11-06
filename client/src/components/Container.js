import React, { useState } from 'react';
import { deleteTasks, updateTask } from '../helper/axiosHelper';

export const Container = ({ taskList, setResp, getTasks }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const entry = taskList.filter((item) => item.type === 'entry');
  const bad = taskList.filter((item) => item.type === 'bad');

  const handleOnDelte = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete  ${idsToDelete.length} tasks?`
      )
    ) {
      //calling api to delte the data

      const result = await deleteTasks({ ids: idsToDelete });
      setResp(result);
      //fetching api to pull all the data

      result?.status === 'success' && getTasks() && setIdsToDelete([]);
    }
  };

  const handleOnChecked = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    // take out from idsToDelete
    const temArg = idsToDelete.filter((itm) => itm !== value);

    if (checked) {
      //push in to idsToDelete
      temArg.push(value);
    }
    setIdsToDelete(temArg);
  };
  const switchTask = async (obj) => {
    //send update to the server

    const result = await updateTask(obj);
    setResp(result);

    //if success, fetch all the data
    result.status === 'success' && getTasks();
  };
  return (
    <>
      <div class='row mt-5 pt-2'>
        {/* <!-- 1. entry list --> */}
        <div class='col-md'>
          <h3 class='text-center'>Task Entry List</h3>
          <hr />
          <div>
            <input
              type='checkbox'
              value='entry'
              onChange={handleOnAllCheck}
              class='form-check-input'
            />
            {''}
            <label htmlFor=''>Select all Entry List</label>
          </div>
          <table class='table table-striped table-hover border opacity'>
            <tbody id='entry'>
              {entry.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>
                    {' '}
                    <input
                      type='checkbox'
                      checked={idsToDelete.includes(item._id)}
                      value={item._id}
                      onChange={handleOnChecked}
                      class='form-check-input'
                    />{' '}
                    {item.task}
                  </td>
                  <td>{item.hr}hr</td>
                  <td class='text-end'>
                    {/* <button
                  onClick={() => handleOnDelte(item._id, item.task)}
                  class="btn btn-danger"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>{" "} */}
                    <button
                      onClick={() => switchTask({ _id: item._id, type: 'bad' })}
                      class='btn btn-success'
                    >
                      <i class='fa-solid fa-arrow-right'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- 2. bad list  --> */}
        <div class='col-md'>
          <h3 class='text-center'>Bad List</h3>
          <hr />
          <div>
            <input
              type='checkbox'
              value='bad'
              onChange={handleOnAllCheck}
              class='form-check-input'
            />
            {''}
            <label htmlFor=''>Select all Bad List</label>
          </div>
          <table class='table table-striped table-hover border opacity'>
            <tbody id='bad'>
              {bad.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type='checkbox'
                      checked={idsToDelete.includes(item._id)}
                      value={item._id}
                      onChange={handleOnChecked}
                      class='form-check-input'
                    />{' '}
                    {item.task}
                  </td>
                  <td>{item.hr}hr</td>
                  <td class='text-end'>
                    <button
                      onClick={() =>
                        switchTask({ _id: item._id, type: 'entry' })
                      }
                      class='btn btn-warning'
                    >
                      <i class='fa-solid fa-arrow-left'></i>
                    </button>{' '}
                    {/* <button
                  onClick={() => handleOnDelte(item._id, item.task)}
                  class="btn btn-danger"
                >
                  <i class="fa-solid fa-trash"></i>
                </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class='alert alert-info'>
            You could have save ={' '}
            <span id='badHr'>
              {bad.reduce((acc, item) => acc + +item.hr, 0)}
            </span>
            hr
          </div>
        </div>
      </div>
      {idsToDelete.length > 0 && (
        <div className='d-grid mb-2'>
          <button onClick={() => handleOnDelte()} class='btn btn-danger'>
            <i class='fa-solid fa-trash'></i> Delete {idsToDelete.length} tasks
          </button>
        </div>
      )}
    </>
  );
};
