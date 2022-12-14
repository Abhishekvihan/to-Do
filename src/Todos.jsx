import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const getLocalItems = () => {
  let list = localStorage.getItem('list');

  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

const Todos = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(getLocalItems() || []);
  const [showInputContainer, setShowInputContainer] = useState(true);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items));
  }, [items]);

  const additem = (e) => {
    setInputValue(e.target.value);
  };

  const addItemToState = (ind) => {
    if (!inputValue || inputValue === ' ') {
      return;
    }
    setItems([
      ...items,
      {
        id: ind,
        status: 'unChecked',
        value: inputValue,
      },
    ]);
    setInputValue('');
    setShowInputContainer(!showInputContainer);
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((element, ind) => {
      return ind != id;
    });
    setItems(updatedItem);
  };

  const setAccordingly = (id, arg) => {
    if (arg && arg === 'check') {
      const newState = items.map((i) => {
        if (i.id === id) {
          return { ...i, status: 'checked' };
        }
        return i;
      });
      setItems(newState);
    } else {
      const newState = items.map((i) => {
        if (i.id === id) {
          return { ...i, status: 'unChecked' };
        }
        return i;
      });
      setItems(newState);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pl-10 py-10">
      <button
        onClick={() => {
          setShowInputContainer(!showInputContainer);
        }}
        className={
          showInputContainer
            ? 'bg-orange-500 text-white text-xl md:text-2xl  px-4 py-2 md:px-6 md:py-3 rounded-md'
            : 'hidden'
        }
      >
        Add a todo
      </button>
      <form
        className={
          showInputContainer
            ? 'hidden'
            : 'border border-gray-300 pt-8 p-5 rounded-md inline-block'
        }
      >
        <input
          className={
            showInputContainer
              ? ' hidden '
              : 'block placeholder:text-gray-300 border-b-2 px-12  text-center border-orange-200 focus:border-orange-500 focus:outline-none'
          }
          placeholder="Add item to the list"
          value={inputValue}
          onChange={(e) => {
            additem(e);
          }}
        />
        <div
          className={
            showInputContainer ? 'hidden' : 'flex justify-center gap-x-10 pt-5'
          }
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              addItemToState(Math.ceil(Math.random() * 1000));
            }}
            className="bg-orange-500 text-white text-lg px-4 py-2 rounded-md"
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowInputContainer(!showInputContainer);
            }}
            className="bg-gray-300 text-gray-700 text-lg px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-gray-700 text-lg md:text-2xl pt-5 md:pt-8 font-bold">
          Things to get done
        </h2>
        {items.map((element, ind) => {
          return (
            element.status === 'unChecked' && (
              <div
                key={ind}
                className="flex items-center  text-lg md:text-xl py-1"
              >
                <div className=" flex items-center justify-center gap-x-3 pr-10">
                  <div className="w-3 h-3 md:w-4 md:h-4 flex self-center appearance-none default:ring-2 checked:bg-orange-400">
                    <input
                      id={ind}
                      onChange={() => setAccordingly(element.id, 'check')}
                      className="pr-5 w-full h-full self-center"
                      type="checkbox"
                      checked={false}
                    />
                  </div>
                  <label htmlFor={ind} className="text-lg md:text-xl inline">
                    {element.value}
                  </label>
                </div>
                <button onClick={() => deleteItem(ind)}>
                  <AiOutlineClose className="text-gray-400 text-lg" />
                </button>
              </div>
            )
          );
        })}
        <div>
          <h2 className="text-gray-700 text-lg md:text-2xl pt-5 md:pt-8 font-bold ">
            Things done
          </h2>
          {items.map(
            (element, ind) =>
              element.status === 'checked' && (
                <div key={ind} className="flex items-center  py-1">
                  <div className=" flex items-center text-lg md:text-2xl gap-x-3">
                    <div className="w-3 h-3 md:w-4 md:h-4 flex self-center appearance-none default:ring-2 checked:bg-orange-400">
                      <input
                        id={ind}
                        onChange={() => setAccordingly(element.id)}
                        className="pr-5 self-center w-full h-full"
                        type="checkbox"
                        checked={true}
                      />
                    </div>
                    <label htmlFor={ind} className="text-lg md:text-xl inline">
                      {element.value}
                    </label>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default Todos;
