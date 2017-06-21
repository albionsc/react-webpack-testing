node {
    
    stage('Prepare') {
        deleteDir()
        checkout scm;
        def nodeHome = tool 'NodeJS_6';
        env.PATH="${env.PATH}:${nodeHome}/bin";
        sh 'npm install';
    }
    
    
    stage('QA') {
        try{
            sh 'npm run test:ci'
        } finally {
            step([$class: 'JUnitResultArchiver', testResults: '**/reports/junit/junit.xml'])
            step([
                $class: 'CoberturaPublisher',
                coberturaReportFile: '**/reports/coverage/cobertura-coverage.xml',
                onlyStable: false,
                failUnhealthy: true,
                failUnstable: true
            ])
            
            sh 'npm run lint:ci || true';
            step([$class: 'CheckStylePublisher',
                pattern: '**/reports/eslint/eslint.xml',
                failedTotalAll : '0'
            ])
        }
    }
    
    stage('Build') {
        sh 'npm run build';
        docker.withRegistry('https://registry.hub.docker.com', 'albionsc_dockerhub_creds') {
            def newImage = docker.build "albionsc/react-webpack-app:${env.BRANCH_NAME}-${env.BUILD_NUMBER}";
            // newImage.push();
            newImage.withRun {petclinic -> 
                def externalPort = petclinic.port(3000);
                println 'App Exposed on ${externalPort}'
                sleep 30;
            }

        }
        
    }
}