// article : https://medium.com/deno-the-complete-reference/run-shell-commands-in-deno-26c3e9b72e03
// example : https://github.com/edkaresli/deno_subprocess

// todo :
//      run shell script
//

const runNodeProcess = async () => {
  const nodeProcess = Deno.run({
    cmd: [
      "node",
      "./scripts/counter.js",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await nodeProcess.status();
  const rawOutput = await nodeProcess.output();
  const rawError = await nodeProcess.stderrOutput();
  // the following will cause no result
  // const {code,rawOutput,rawError}= await Promise.all([
  //   nodeProcess.status(),
  //   nodeProcess.output(),
  //   nodeProcess.stderrOutput()
  // ])
  // nodeProcess.close();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
    console.log("Finished Node.js process...");
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  // console.log("code:", code);
};

const runShellProcess = async () => {
  const shellProcess = Deno.run({
    cmd: [
      "tail",
      "-4",
      "./language.txt"
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const echo = await shellProcess.status();
  const output2 = await shellProcess.output();
  const error2 = await shellProcess.stderrOutput();

  if (echo.code === 0) {
    await Deno.stdout.write(output2);
    console.log("\nFinished shell echo command process...");
  } else {
    console.error("Here...");
    const errorString = new TextDecoder().decode(error2);
    console.log(errorString);
  }
};

const main = async () => {
  await runNodeProcess();
  await runShellProcess();
  // await runCppProcess();
};

main();
