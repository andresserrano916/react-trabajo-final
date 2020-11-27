import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Footer } from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Courses from '../../pages/courses/Courses';
import Enrollment from '../../pages/enrollments/Enrollment';
import Enrollments from '../../pages/enrollments/Enrollments';
import HomePage from '../../pages/home/HomePage';
import Students from '../../pages/students/Students';

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={HomePage} />
            <Route path="/(.+)" render={() => (
                <>
                    <Navbar />
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/students" component={Students} />
                            <Route path="/courses" component={Courses} />
                            <Route path="/enrollments" component={Enrollments} />
                            <Route path="/enrollment" component={Enrollment} />
                        </Switch>
                    </Container>
                    <Footer />
                </>
            )} />
        </>
    );
};

export default Routes;
