node {
    
    stage('Prepare') {
        checkout scm;
        def nodeHome = tool 'NodeJS_6';
        env.PATH="${env.PATH}:${nodeHome}/bin";
        sh 'npm install';
    }
    
    
    stage('QA') {
        sh 'npm run test:ci'
    }
}