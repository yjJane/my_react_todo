import { useEffect, useState } from 'react'
// import './App.css'

function App() {

  //랜덤 키 셋팅
  let localKey;

  const randomKeySet = () => {
    var array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    for (var i = 0; i < array.length; i++) {
      localKey = array[i];
    }
  }
  randomKeySet();

  // 현재 localstorage list를 배열에 저장
  const onLoadList = () => {
    let currentArr = [];
    let maxIdx = 1;
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      currentArr.push({key, value});
      // value.idx 값 비교해서 제일 큰 수 추출해 idx값 제어
      maxIdx = Math.max( ...currentArr.map((item) => item.value.idx) );
    }
    return {
      currentArr: currentArr,
      maxIdx: maxIdx,
    };
  }
  const totalData = onLoadList();
  const currentList = totalData.currentArr;
  const currentIdx = totalData.maxIdx;

  //현재 value값 상태변화
  const [value, setValue] = useState("");
  const [todoIdx, setTodoIdx] = useState(currentIdx);
  const [loadList, setLoadList] = useState(currentList);

  const onChange = (e) => setValue(e.target.value);

  const onAddList = () => {
    // 현재 local storage list arragy(prev = onLoadList = currentArr)에 새로운 데이터 추가
    setTodoIdx ((idVal) => {
      return idVal + 1;
    });

    setLoadList((prev) => {
      return [...prev, {key:localKey, idx: todoIdx, value: value }];
    });
    // submit 할 때 로컬스토리지에 저장(key, value)
    localStorage.setItem(localKey, JSON.stringify({idx: todoIdx, value: value}));
    // input 창 비움
    setValue("");
  }

  const onDelete = (e) => {
    // x버튼 클릭 시 해당 random key 추출
    // localStorage의 key값과 비교
    for(let i = 0; i < localStorage.length; i++) {
      let key2 = localStorage.key(i);
      if(e.target.value === key2) {
        localStorage.removeItem(e.target.value);
      }
    }
  }
  
  return (
    <div className="App">
      <div className="addList">
        <input type="text" placeholder='To Do Number' onChange={onChange} value={value}></input>
        <button onClick={onAddList}>Add To Do</button>
      </div>
      <hr />
      <div>
        <ul>
          {loadList.map((item, i) => {
            return <li key={i}>{item.value.idx} : {item.value.value}<button onClick={onDelete} value={item.key}>X</button></li>
          })}

        </ul>
      </div>


    </div>

  );
}

export default App;
