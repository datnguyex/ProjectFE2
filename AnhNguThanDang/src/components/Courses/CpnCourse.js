import React, { useState } from 'react';
import {Navbar} from "../../../"
import {Navbar} from "../../pages/auth/navbarCourse"
import {CourseList} from "../../pages/admin/courses/CourseList"
export function parentSearchCourse() {
    // const [searchCourse, setSearchCourse] = useState('');
    return (
        <div>
          {/* <Navbar onInputChange={(e) => setSearchCourse(e.target.value)} onSubmit={() => {}} />
          <CourseList searchTerm={searchCourse} /> */}
        </div>
      );
    }