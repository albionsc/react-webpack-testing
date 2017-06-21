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
            
            docker.image('selenium/standalone-chrome:latest').withRun('-P') {selenium ->
                def seleniumServerPort = selenium.port(4444);
                sh 'node ./node_modules/.bin/wdio --port=' + seleniumServerPort + ' wdio.conf.js';
                // newImage.withRun('-P') {petclinic -> 
                //     def externalPort = petclinic.port(3000);
                //     println 'App Exposed on  ' + externalPort
                //     sleep 30;
                // }
            }
        }
        
    }
}