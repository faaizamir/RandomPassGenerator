import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [NumberAllowed, setNumberAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const [Pass, setPass] = useState("")
  
  // Callback Hook -
  const passwordGenerator = useCallback(
    () => {
      let password = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(NumberAllowed) str += "0123456789"
      if(CharAllowed) str += "!@#$%^&*()_+=-"

      for (let index = 1; index <= length; index++) {
        let index = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(index)
      }
      setPass(password)
    },
    [length, NumberAllowed, CharAllowed, setPass],
  )
  
  // Effect Hook -
  useEffect(() => {
    passwordGenerator();
  }, [length, NumberAllowed, CharAllowed, passwordGenerator])
  
  // Ref Hook -
  const passwordRef = useRef(null);
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Pass);
  }, [Pass])

  return (
    <>
      <div className='w-full max-w-md mx-auto bg-gray-600 rounded-xl text-orange-600 p-4 my-8 m'>
        <div className="in w-full mx-auto bg-gray-600 flex justify-between">
          <input type="text" value={Pass} ref={passwordRef} readOnly className='bg-white selection:bg-gray-400 outline-none rounded-l-lg w-full text-orange-600 font-bold'/>
          <button className='px-2 py-1 bg-blue-700 rounded-r-lg' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="down my-4 bg-gray-600">

          <input
           type="range"
           value={length} 
           min={8}
           max={30}
           onChange={(e)=> {setLength(e.target.value)}}
           id='length'
           className='mx-2 cursor-pointer'
          /> <label htmlFor="length" className='p-0 m-0 bg-gray-600 -ml-1'> Length: {length}</label>

          <input 
           type="checkbox" 
           defaultChecked={NumberAllowed} 
           onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}
           id='numberInput'
          className='mx-2'
          /> <label htmlFor="numberInput" className='p-0 m-0 bg-gray-600 -ml-1'> Numbers</label>
          
          <input type="checkbox" 
           defaultChecked={CharAllowed} 
           onChange={()=> { 
            setCharAllowed((prev) => !prev)
          }}
           id='charInput'
          className='mx-2'
          /> <label htmlFor="charInput"  className='p-0 m-0 bg-gray-600 -ml-1'> Characters</label>

        </div>
      </div>
    </>
  )
}

export default App
