import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Anchor from '../components/Anchor'
import Logo from '../public/secu.png'

const Home: NextPage = () => {

  const { data: session } = useSession()
  const router = useRouter()

  {/*if (session) {
    router.push("/client")
  }*/}

  return (
    <div className="w-screen h-screen flex justify-center items-center scroll-auto overflow-auto lg:bg-bg_laptop lg:bg-cover">
      <div className="w-4/5 h-4/5 bg-white rounded-3xl shadow-2xl shadow-black flex-col lg:w-1/3 xl:w-1/4">
        <div className='w-full h-1/3 flex flex-col justify-center items-center gap-4'>
          <Anchor href='/'><Image src={Logo} alt="Secubox Logo" width={"250px"} height={"100px"} /></Anchor>
          <h1 className='text-5xl font-medium'>Bienvenue!</h1>
        </div>

        <div className='w-full h-1/3 flex flex-col justify-center items-center gap-4'>
          <div className='w-2/3 h-2/5 text-center text-md font-normal'>Vous êtes un client? Veuillez vous authentifier ci-dessous:</div>
          <Anchor className='w-2/3 h-1/4 bg-yellow-500 border-0 rounded-3xl text-white flex justify-center items-center font-bold shadow-xl active:shadow-none' href='/auth/client/signin'>Client</Anchor>
        </div>

        <div className='w-full h-1/3 flex flex-col justify-center items-center gap-4'>
          <div className='w-2/3 h-2/5 text-center text-md font-normal'>Vous êtes un propriétaire? Veuillez vous authentifier ci-dessous:</div>
          <Anchor className='w-2/3 h-1/4 bg-yellow-500 border-0 rounded-3xl text-white flex justify-center items-center font-bold shadow-xl active:shadow-none mb-4' href='/auth/pro/signin'>Propriétaire</Anchor>
        </div>
      </div>
    </div>
  )
}
export default Home