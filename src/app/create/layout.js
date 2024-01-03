import TitleBar from '@/components/Titlebar';

export default function createLayout({ children }) {
  return (
    <>
    <TitleBar />
    <div className="my-5 mx-10">
        {children}
    </div>
    </>
  )
}
