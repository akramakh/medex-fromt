import React from 'react';
import SearchSection from './sections/search';
import SpecialitiesSection from './sections/specialities';
import DoctorsSection from './sections/doctors';
import FeaturesSection from './sections/features';
import BlogsSection from './sections/blogs';

export default function index() {
    return (
        <div>
            <SearchSection />
            <SpecialitiesSection />
            <DoctorsSection />
            <FeaturesSection />
            <BlogsSection />
        </div>
    )
}
