#!/usr/bin/env groovy
def doBuild(){
  try {
    timeout(time: 1, unit: 'HOURS'){
      sh "chmod 777 build_script"
      sh "build_script"
    }
  } catch(e) {
    sh "echo error during build"
    throw e
  }
}

def doDeploy() {
  try {
    timeout(time: 1, unit: 'HOURS') {
      sh "chmod 777 deploy_script"
      sh "deploy_script"
    }
  } catch(e) {
  sh "echo error during deploy"
  throw e
  }
}
  
def isDevBranch() {
  return (env.BRANCH_NAME.startsWith("dev"))
}

def isMasterBranch() {
  return (env.BRANCH_NAME.startsWith("master"))
}

pipeline {
  agent {
    label 'largenode10'
  }
  triggers {
    pollSCM('')
  }
  parameters {
    booleanParam(defaultValue: isDevBranch(),
    description: 'Flag to run stages if on dev branch.',
    name: 'runIfDev')
    booleanParam(defaultValue: isMasterBranch(),
    description: 'Flag to run stages if on master branch.',
    name: 'runIfMaster')
  }
  stages {
    stage('Build') {
      steps {
        script { doBuild() }
      }
    }
    stage('Deploy') {
      when {
        expression { params.runIfDev == true ||
        params.runIfMaster == true }
      }
      steps { script { doDeploy() } }
    }
  }
}   
