watch('haml\/(.*\.haml)') {
  |md|
  output = md[1].gsub(/\.haml$/, '.html')
  cmd = "haml #{md[0]} #{output}"
  puts cmd
  system(cmd)
  system("haml #{md[0]}")
}
