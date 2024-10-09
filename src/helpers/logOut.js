

export const LogOutFetch = async () => {

    try {
      const response = await fetch('http://localhost:8080/api/sessions/logout', {
        method: 'GET',
        credentials: 'include',
      });
    
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }else{
        return (true)
      }


    } catch (err) {
      if (err.message === '401') {
   
      } else {

        console.log(err,'error clas: ', err.message)
      }
    }

}

  

