import Teams from '../components/custom_ui/Teams';
import Nav from '../components/custom_ui/Nav';
import BlogCard from '../components/custom_ui/BlogCard';
import BlogList from '../components/custom_ui/BlogList';
import Content from '../components/custom_ui/Content';
import Gallery from '../components/custom_ui/Gallery';
import Grid from '../components/custom_ui/Grid';
import Hero from '../components/custom_ui/Hero';
import Statistic from '../components/custom_ui/Statistic';
import Table from '../components/custom_ui/Table';
import Testimonial from '../components/custom_ui/Testimonial';
import YoutubeContent from '../components/custom_ui/YoutubeContent';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  

const Testing = ()=>{
    return(
        <>
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>

        <Teams />
        <Nav />
        <BlogCard />
        <BlogList />
        <Content />
        <Gallery />
        <Grid />
        <Hero />
        <Statistic />
        <Table />
        <Testimonial />
        <YoutubeContent />
        </>
    )
}
export default Testing;