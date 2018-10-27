# 1. Given an array [1,4,5,7,12, 19, 45, 101], write a function that returns
# array that satisfies this condition: x*2 - (5 - x) == even

def meets_condition?(num)
  (num * 2 - (5 - num)) % 2 == 0
end

def filter(num_array)
  num_array.select do |num|
    meets_condition?(num)
  end
end
