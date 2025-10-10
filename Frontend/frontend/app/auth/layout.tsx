import Logo from "@/components/ui/Logo";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>  
        <div className=" lg:grid lg:grid-cols-2 lg:min-h-screen">
            <div className=" bg-blue-600">

                <div className="w-full flex justify-center items-center py-20">

                    <Logo />
                </div>

            </div>
            <div className="p-10 lg:py-28">
                <div className=" max-w-3xl"></div>
                 {children}
            </div>

        </div>
       
    </>
    
  );
}

