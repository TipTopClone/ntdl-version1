import { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks } from './helper/axiosHelper';
import { Form } from './components/Form';
import { Container } from './components/Container';

function App() {
  const [taskList, setTaskList] = useState([]);

  // const [idsToDelete, setIdsToDelete] = useState([]);

  console.log(idsToDelete);
  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await getAllTasks();
    console.log(data);
    data?.status === 'success' && setTaskList(data.taskList);
  };

  //collect ids of selectd task

  const handleOnAllCheck = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    if (value === 'entry') {
      const entryIds = entry.map((item) => item._id);
      console.log(entryIds);

      ///if checked add the ids to our idsToDelete
      if (checked) {
        setIdsToDelete([...idsToDelete, ...entryIds]);
      }

      ///else remove entryIds from the idsToDelete
      else {
        const tempArgIds = idsToDelete.filter((id) => !entryIds.includes(id));
        setIdsToDelete(tempArgIds);
      }
    }

    if (value === 'bad') {
      const badIds = bad.map((item) => item._id);
      console.log(badIds);
      if (checked) {
        setIdsToDelete([...idsToDelete, ...badIds]);
      }

      ///else remove badIds from the idsToDelete
      else {
        const tempArgIds = idsToDelete.filter((id) => !badIds.includes(id));
        setIdsToDelete(tempArgIds);
      }
    }
  };

  return (
    <div class='wrapper'>
      <div class='container'>
        {/* <!-- top title  --> */}
        <div class='row g-2'>
          <div class='col mt-5 text-center'>
            <h1>Not to do list</h1>
          </div>
        </div>

        {/* show the server message  */}

        {resp?.message && (
          <div
            className={
              resp?.status === 'success'
                ? 'alert alert-success'
                : 'alert alert-danger'
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- form  --> */}

        <Form
          getTasks={getTasks}
          totalHrs={totalHrs}
          setResp={setResp}
          resp={resp}
        />

        {/* <!-- table area  --> */}
        <Container taskList={taskList} setResp={setResp} getTasks={getTasks} />

        {/* <!-- toat time allocated --> */}
        <div class='alert alert-info'>
          Total hrs per week allocated = <span id='totalHr'>{totalHrs}</span>
          hr
        </div>
      </div>
    </div>
  );
}

export default App;
