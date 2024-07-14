import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const Dashboard = () => {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <>
      <Navbar isAuth={isAuth} />
      <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 p-8">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Card 1 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>DocBot</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Instantly chat with your PDFs to retrieve key information without the hassle of manual searching.</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">See Demo</Button>
              <Link href='/docbot'><Button>Use Model</Button></Link>
            </CardFooter>
          </Card>

          {/* Card 2 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>ArtSynth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Empower your creativity with our advanced toolset for effortlessly generating stunning, professional-grade images.</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">See Demo</Button>
              <Link href='/artsynth'><Button>Use Model</Button></Link>
            </CardFooter>
          </Card>

          {/* Card 3 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>VoiceWiz</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Streamline your workflow by transcribing audio files, meeting recordings, and YouTube videos into precise text.</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">See Demo</Button>
              <Button>Use Model</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
