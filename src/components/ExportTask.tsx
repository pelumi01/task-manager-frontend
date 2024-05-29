import { ChangeEvent, useState } from "react";

const ExportTask = () => {
    const [dateRange, setDateRange] = useState({
        from_date: "",
        to_date: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDateRange((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    
    return (
        <>
            <div className="mb-4">
                <label htmlFor="From" className="block text-gray-700 font-bold mb-2 text-left">From Date</label>
                <input role="input" type="date" id="From" name="from_date" onChange={(e) => handleChange(e)} value={dateRange.from_date} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></input>
            </div>
            <div className="mb-4">
                <label htmlFor="to" className="block text-gray-700 font-bold mb-2 text-left">To Date</label>
                <input role="input" type="date" id="to" name="to_date" onChange={(e) => handleChange(e)} value={dateRange.to_date} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="flex items-center justify-between">
                <a role="a" href={`${import.meta.env.VITE_API_HOST}/download-task?from_date=${dateRange.from_date}&to_date=${dateRange.to_date}`} target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Export</a>
            </div>
        </>
    );
}

export default ExportTask;