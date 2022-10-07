import { useEffect, useState } from 'react'
import ToDoList from './components/toDoList';

function App() {
  //현재 value값 상태변화
  const [value, setValue] = useState("");
  const [todoIdx, setTodoIdx] = useState(0);
  const [loadList, setLoadList] = useState([]);

  //랜덤 키 셋팅
  // let localKey;
  let localLen = localStorage.length;

  const randomKeySet = () => {
    let localKey;
    var array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    for (var i = 0; i < array.length; i++) {
      localKey = array[i];
    }
    return localKey;
  }

  // 현재 localstorage list를 배열에 저장
  const onLoadList = () => {
    // state 변수를 직접 사용할 경우 비동기(async) 하게 동작 하기 때문에 함수 내에서 값이 업데이트 되지 않음
    // 그래서 로컬 변수 (local variable)을 선언하여 사용하고, 마지막에 state 변수에 세팅
    let localIdx = 0;
    let currentArr = [];

    for(let i = 0; i < localLen; i++) {
      const key = localStorage.key(i);
      const val = JSON.parse(localStorage.getItem(key));
      val.randomKey = key;
      currentArr.push(val);
    }

    currentArr.sort(function (a, b) {
      if (a.idx > b.idx) {
        return 1;
      }
      if (a.idx < b.idx) {
        return -1;
      }
      return 0;
    });

    // index 설정
    if (localIdx <= currentArr.idx) {
      localIdx = currentArr.idx + 1;
    }

    // 변경된 현재 상태값들 최종으로 변경해주기.
    setTodoIdx(localIdx);
    setLoadList(currentArr);
    
  }

  const onChange = (e) => setValue(e.target.value);
  const onAddList = () => {
    // 입력한 input 값이 공백일 경우 함수 실행 방지
    if(value == ""){
      return false
    }
    
    // 현재 local storage list arragy(prev = onLoadList = currentArr)에 새로운 데이터 추가
    setLoadList((prev) => {
      return [...prev, {randomKey: randomKeySet(), idx:todoIdx, value: value}];
    });
    // submit 할 때 로컬스토리지에 저장(key, value)
    localStorage.setItem(randomKeySet(), JSON.stringify({idx: todoIdx, value: value}));

    // 현재 상태값 index 에서 +1.
    setTodoIdx(todoIdx + 1);
    // input 창 비움
    setValue("");
  }

  //초기화
  useEffect(() => {
    onLoadList();
  },[]);


  
  return (
    <div className="App">
      <div className="addList">
        <input type="text" placeholder='To Do Number' onChange={onChange} value={value}></input>
        <button onClick={onAddList}>Add To Do</button>
      </div>
      <hr />
      <div>
        <ul>
          {loadList.map((item, i) => (
            <ToDoList
            key={i}
            item={item}
            idx={i}
            todoIdx={todoIdx}
            setTodoIdx={setTodoIdx}
            loadList={loadList}
            setLoadList={setLoadList}
            localLen={localLen}></ToDoList>
            )
          )}

        </ul>
      </div>


    </div>

  );
}

export default App;
