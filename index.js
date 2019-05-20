module.exports = (protoPath, packageName) => {
  const loadProto = (path, options) => {
    options = options || {
      keepCase: true,
      includeDirs: [protosRoot]
    };

    return protoLoader.loadSync(path, options);
  };

  const loadPackage = (package, definition) => {
    return grpc.loadPackageDefinition(definition)[package];
  };

  const proto = loadPackage(packageName, loadProto(protoPath));

  return new proto.Pipeline(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
};
