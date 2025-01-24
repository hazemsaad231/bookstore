import { PieChart, Pie, Cell, ResponsiveContainer as PieResponsiveContainer } from 'recharts';
import { XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { AreaChart, Area, ResponsiveContainer as AreaResponsiveContainer } from 'recharts';
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineAttachMoney, MdOutlineIntegrationInstructions, } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState } from 'react';

const pieData = [
  { name: 'Group A', value: 350 },
  { name: 'Group B', value: 200 },
  { name: 'Group C', value: 150 },
  { name: 'Group D', value: 100 },
  { name: 'Group E', value: 250 },
  { name: 'Group F', value: 200 },

];
const COLORS = ['blue', '#00C49F', '#FFBB28', '#FF8042','red','green'];



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  // حساب نصف المسافة بين الinnerRadius و outerRadius ليتم وضع النسبة في المنتصف
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  
  // حساب موقع النقطة بناءً على الزاوية
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



const areaChartData = [
  { name: 'love', uv: 2000, pv: 2400, amt: 2400 },
  { name: 'sports', uv: 2000, pv: 1398, amt: 2210 },
  { name: 'self help', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'cooking', uv: 2780, pv: 6908, amt: 2000 },
  { name: 'kids', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'history', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'program', uv: 2780, pv: 1908, amt: 2000 },
  { name: 'fiction', uv: 2780, pv: 3908, amt: 2000 },
];






const Carts = () => {

  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      let response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
     
    } catch (error) {
      console.error(error);
    
    }
  };
  
  useEffect(() => {
    getBooks();
  }, []);
  
  console.log(books);


   {
    return (
      <div className="flex flex-col items-center bg-gradient-to-r font-sans from-red-100 to-white-100 overflow-hidden py-20 text-center">

        <div className="flex gap-4 mb-4 text-md sm:text-md md:text-md lg:text-xl xl:text-xl p-4">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full text-center">
            <h2 className="font-semibold mb-2">Total books</h2>
            <h1>{books.length}</h1>
            <IoBookSharp className="text-3xl mt-2 m-auto" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl w-full text-center">
            <h2 className="font-semibold mb-2">Total ratio</h2>
            <h1>2.6</h1>
            <MdOutlineIntegrationInstructions className="text-3xl mt-2 m-auto" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl w-full text-center">
            <h2 className="font-semibold mb-2">Total revenue</h2>
            <h1>20.255</h1>
            <MdOutlineAttachMoney className='text-3xl mt-2 m-auto'/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4 w-full">

          <div className="bg-white py-8 px-2 rounded-lg shadow-2xl h-[400px] w-full text-center">
            <h2 className="text-xl font-semibold mb-2">Total sales</h2>
            <AreaResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </AreaResponsiveContainer>
          </div>

          <div className="bg-white py-8 px-2 rounded-lg shadow-2xl h-[400px] w-full text-center">
            <h2 className="text-xl mb-2 font-semibold">Leads by source</h2>
            <PieResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="100%"
                  fill="#8884d8"
                  dataKey="value"
                  
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                  ))}
                </Pie>
              </PieChart>
            </PieResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default Carts;

