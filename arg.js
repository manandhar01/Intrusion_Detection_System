const { spawn } = require('child_process');

const jsonData = '{"name":"John","age":30,"car":null}';

const child = spawn('python',['arg.py','-json',jsonData],{shell:true});

child.stdout.on('data', (data) => {
    console.log(`stdout:\n ${data}`);
});
    
child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
    
child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});