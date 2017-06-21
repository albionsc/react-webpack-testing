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
            
            
            docker.image('selenium/hub:latest').withRun('-P --name selenium-hub -e GRID_TIMEOUT=10') {seleniumHub ->
                docker.image('selenium/node-chrome:latest').withRun('-P --link selenium-hub:hub --name selenium-node') {seleniumNode ->
                    newImage.withRun('-P --link selenium-node') {application ->
                        def seleniumServerPort = seleniumHub.port(4444).split(':')[1];
                        def appPort = application.port(3000).split(':')[1];
                        sh 'node ./node_modules/.bin/wdio --port=' + seleniumServerPort + ' --baseUrl=http://localhost:' + appPort + ' wdio.conf.js';
                    }
                }
            }
        }
        
    }
}