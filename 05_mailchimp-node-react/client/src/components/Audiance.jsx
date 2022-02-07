import React from 'react';


const Audiance = () =>{

        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
        fetch("http://localhost:4000/audiance", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          console.log("working");
          // console.log(members);




  return(
    <div className="audiance">
      <h2 className="audiance-header">Audiance / Lists</h2>
      <ul>
        <li className="member-List">mdshayon@gmail.com</li>
        <li className="member-List">mdshayon@gmail.com</li>
      </ul>

    </div>
  );
}


export default Audiance;
