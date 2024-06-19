import { useContext } from 'react'
import '../styles/Export.css'
import { TableContext } from '../context/TableContext'

export default function Export(){

    const {openExport,
            userData,
            setOpenExport
    }=useContext(TableContext)


    function exportDataAsCSV(type){
        let csvData=[]

        let csvCols=['Customer', 'Email', 'Birth Date', 'Age', 'Weight', 'University']
        csvData.push(csvCols.join(',')+"\n")
        userData.map((user)=>{
            let csvRow=[]
            csvRow.push(user.firstName+" "+user.lastName)
            csvRow.push(user.email)
            csvRow.push(user.birthDate)
            csvRow.push(user.age)
            csvRow.push(user.weight)
            csvRow.push(user.university)
            csvData.push(csvRow.join(',')+"\n")
            console.log("CSV Row",csvRow.join(','))
        })

        console.log("CSV Data",csvData)
        
        if(type=='csv')
        downloadCSVFile(csvData.join(''),type)

        if(type=='xls')
        downloadXLSFile(csvData.join(''),type)
        
    }

    function downloadXLSFile(csv_data)
    {
        const rows = csv_data.split('\n');

        let xlsData = '';
        rows.forEach(row => {
          xlsData += row.split(',').join('\t') + '\n';
        });
      
        const blob = new Blob([xlsData], { type: 'application/vnd.ms-excel' });
      
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `DynamicTable_${Math.floor(Math.random()*1000)}.xls`;
      
        document.body.appendChild(link);
        link.click();
      
        document.body.removeChild(link);
    }

    function downloadCSVFile(csv_data) {
        
        
        let temp_link = document.createElement('a');

        let CSVFile = new Blob([csv_data], { type: "text/csv" });
        temp_link.download = `DynamicTable_${Math.floor(Math.random()*1000)}.csv`;

     
        let url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;
     
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
     
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    function exportDataAsPDF()
    {
        setOpenExport(!openExport)
        let timeout=setTimeout(()=> window.print(),300)
    }
    
    return (
        <>
            {
                openExport?
                <div className='export-container flex flex-col p-5'>
                    <div className='option p-2 hover:font-bold' onClick={()=>exportDataAsCSV('xls')}>Export as XLS</div>
                    <div className='option p-2 hover:font-bold' onClick={()=>exportDataAsCSV('csv')}>Export as CSV</div>
                    <div className='option p-2 hover:font-bold' onClick={()=>exportDataAsPDF()}>Export as PDF</div>
                </div> : null
            }
        </>
    )
}