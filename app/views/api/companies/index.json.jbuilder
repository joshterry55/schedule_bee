json.array! @companies do |id|
  company = Company.find(id)
  json.id company.id
  json.name company.name
end
