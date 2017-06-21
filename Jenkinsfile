node {
    
    stage('Prepare') {
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
}