async function fetchData(){
    const response = await fetch('http://localhost:8000/api/data');
    const data = await response.json();
    console.log(data);
}