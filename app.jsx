import React, { useState } from 'react';

function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default SimpleCounter;
//

import React, { useState, useEffect } from 'react';

function ChangeTitle() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new title"
      />
    </div>
  );
}

export default ChangeTitle;
//

import React, { useState } from 'react';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Text
      </button>
      {isVisible && <p>This is some text that can be hidden or shown.</p>}
    </div>
  );
}

export default ToggleVisibility;
//

import React, { useEffect } from 'react';

function FetchDataOnMount() {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  return <div>Data fetched on mount. Check the console.</div>;
}

export default FetchDataOnMount;
//

import React, { useState, useEffect } from 'react';

function AutoIncrementCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return <div>Count: {count}</div>;
}

export default AutoIncrementCounter;
//

import React, { useState, useEffect } from 'react';

function InputTracker() {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Input changed:', text);
  }, [text]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
    </div>
  );
}

export default InputTracker;
//

import React, { useState, useEffect } from 'react';

function WindowResize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Window width: {windowWidth}px</div>;
}

export default WindowResize;
//

import React, { useState, useEffect } from 'react';

function ButtonClickAlert() {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 5) {
      alert('Button clicked 5 times!');
    }
  }, [clickCount]);

  return (
    <div>
      <button onClick={() => setClickCount(clickCount + 1)}>
        Click me ({clickCount})
      </button>
    </div>
  );
}

export default ButtonClickAlert;
//

import React, { useState, useEffect } from 'react'; //harder

function DataFetchWithCleanup() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); 
    };
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DataFetchWithCleanup;
//

import React, { useState, useEffect } from 'react';

function TimerWithStartStop() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <h1>{time} seconds</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default TimerWithStartStop;
//