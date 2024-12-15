import React from "react";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center bottom-0 border-collapse">
        <div className = "items-center flex w-[80%] bg-white shadow-lg my-2 pt-3 pb-3">
          <div className ="grid text-left w-[30%] pl-[10%]">  
            <h1 className="text-[1.1em] font-bold">Team Demokratica</h1>
            <ul className="text-[0.7em]">
              <li>David Felipe Marín Rosas</li>
              <li>Julián David Huertas Dominguez</li>
              <li>Andrés Felipe Rojas Aguilar</li>
              <li>César Arthuro Lemos Silva</li>
            </ul>
          </div>
          <div className = "grid text-center w-[40%] gap-1.5">
            <p className="text-[0.9em]">Creado utilizando Nextjs, Vercel y SQLite</p>
            <div className="flex gap-7 justify-center items-center  ">
              <Image className="w-[17%] pt-2"
                src="/next.svg"
                alt="Next"
                width={70}
                height={80}
              />
              <Image className="w-[17%] h-[82.5%] pt-2"
                src="/logo_vercel.png"
                alt="Vercel"
                width={70}
                height={80}
              />
              <Image className="w-[14.3%] pt-2"
                src="/sqlite.png"
                alt="SQLite"
                width={70}
                height={10}
              />
            </div>

          </div>
          <div className = "grid text-right w-[30%] pr-[10%]">
            <p className="font-bold">CRUD</p>
            <p className="text-[0.7em]">Ingeniería de Software II</p>
            <p className="text-[0.7em]">Universidad Nacional de Colombia</p>
            <p className="text-[0.7em]">Prof. Hernando Rodriguez</p>
            <p className="text-[0.7em]">Diciembre 2024</p>
          </div>
        </div>        
      </div>  
    </footer>
  );
}
