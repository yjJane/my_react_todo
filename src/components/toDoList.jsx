import React, { useState } from "react";

function ToDoList({loadList, setLoadList, localLen, item, idx, todoIdx, setTodoIdx}) {
  // UI 변경을 위한 상태 초기값 세팅.
  const [modify, setModify] = useState(false);
  // 새로운 input value 받을 변수 설정
  const [textModify, setTextModify] = useState("");
  console.log(todoIdx);

  const onDelete = (e) => {
    let values = e.target.value;

    // x버튼 클릭 시 해당 random key 추출
    // localStorage의 key값과 비교
    for(let i = 0; i < localStorage.length; i++) {
      let key2 = localStorage.key(i);
      if(values === key2) {
        localStorage.removeItem(values);
      }
    }
    setLoadList([
      ...loadList.slice(0, idx),
      ...loadList.slice(idx + 1, localLen)
    ]);

    const maxIdx = Math.max( ...loadList.map((item) => item.idx));
    setTodoIdx(maxIdx + 1);
    
  }
  // value값 받아 상태값 저장 및 변화 감지
  const onTextChange = (e) => setTextModify(e.target.value);
  const onUpdate = (e) => {
    let selectRandonKey = e.target.value;
    // 입력한 input 값이 공백일 경우 함수 실행 방지
    if(textModify == ""){
      return false
    }
    //loadList[idx].randomKey와 클릭한 엘리먼트의 randomkey를 비교하여 새로운 value값으로 변경 / 이에 따라 UI 상태값도 변경 (modify = false로).
    if(loadList[idx].randomKey = selectRandonKey){
      loadList[idx].value = textModify;

      // localstorage에 해당 index or randomkey 의 value 값 변경
      let localValChange = JSON.parse(localStorage.getItem(selectRandonKey));
      localValChange.value = textModify;
      
      localStorage.setItem(selectRandonKey, JSON.stringify(localValChange));
    }

    // span 엘리먼트와 modify btn으로 노출 변경
    setModify(!modify);
    setTextModify("");
  }

  // modify 버튼 클릭 시 input엘리먼트 + update btn 노출
  return(
    <li>
      <div>
        <span>{loadList[idx].idx} :</span>
        {!modify ? (
          <div>
            <span>{loadList[idx].value}</span>
            <button onClick={() => { setModify(!modify);}}>modify</button>
          </div>
          ) : (
          <div>
            <input onChange={onTextChange} defaultValue={textModify}></input>
            <button onClick={onUpdate} value={loadList[idx].randomKey}>update</button>
          </div>
          )
        }
        <button onClick={onDelete} value={loadList[idx].randomKey}>X</button>
      </div>

    </li>
  );
  
}

export default ToDoList;