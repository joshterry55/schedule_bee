json.array! @employees do |emp|
  json.first_name emp.first_name
  json.last_name emp.last_name
  json.id emp.id
end
