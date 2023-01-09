import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center align-center h-screen">
      <h1 className="mt-auto text-bold text-gray-400 text-5xl">Front-End of Ticket Api</h1>
      <div className="my-8" />
      <img src="/loading.svg" className="w-12 h-12 animate-spin mb-auto" />
      <p className=" text-gray-400 text-xs">just kidding, there's nothing loading, no front-end yet</p>
    </div>
  )
}

export default Home
