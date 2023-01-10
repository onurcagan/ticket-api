import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen align-center">
      <h1 className="mt-auto text-2xl text-gray-400 sm:text-3xl md:text-5xl text-bold">Front-End of Ticket Api</h1>
      <div className="my-8" />
      <img src="/loading.svg" className="w-8 h-8 mb-auto sm:w-12 sm:h-12 animate-spin" />
      <p className="text-xs text-gray-400 ">just kidding, there's nothing loading, no front-end yet</p>
    </div>
  )
}

export default Home
