async function fetchData(){
    const response = await fetch('http://localhost:8000/api/detectfiles');
    const data = await response.json();
    console.log(data);
}