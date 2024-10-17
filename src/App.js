import React, { useState, useEffect } from 'react';

// মডেল ফাংশন 
const Modal = ({ onClose }) => {
  useEffect(() => {
    // ৩০ সেকেন্ড পরে মডেল বন্ধ এবং মূল পৃষ্ঠায় ফেরা
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>বিজ্ঞাপন দেখানো হচ্ছে...</h2>
        <p>আপনি ৩০ সেকেন্ড অপেক্ষা করুন।</p>
      </div>
    </div>
  );
};

function App() {
  const [taskCompleted, setTaskCompleted] = useState(
    JSON.parse(localStorage.getItem('completedTasks')) || {}
  );
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // কাজ শেষ করলে টাস্ক সংরক্ষণ ও আপডেট করা
  const completeTask = (taskNumber) => {
    const updatedTasks = { ...taskCompleted, [taskNumber]: true };
    setTaskCompleted(updatedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  // কাজের বোতামে ক্লিক করলে মডেল দেখানো
  const handleButtonClick = (taskNumber) => {
    setCurrentTask(taskNumber);
    setShowModal(true);
  };

  // মডেল বন্ধের পর মূল পৃষ্ঠায় ফেরা
  const closeModal = () => {
    completeTask(currentTask);
  };

  // ৫০টি কাজের বোতাম তৈরি করা
  const buttons = [];
  for (let i = 1; i <= 50; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handleButtonClick(i)}
        style={{
          margin: '10px',
          backgroundColor: taskCompleted[i] ? 'green' : 'initial',
        }}
      >
        Task {i} {taskCompleted[i] && '✔'}
      </button>
    );
  }

  return (
    <div>
      <h1>৫০টি কাজের বোতাম</h1>
      <div className="task-buttons">
        {buttons}
      </div>

      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
